import axios from 'axios';

const CACHE_VERSION = 1;
const CURRENT_CACHES = {
  font: `font-cache-v${CACHE_VERSION}`,
};
const intervalTime = 3000;

//  ToDo:それぞれのサイトに対してのStreakに関する返り値を同じにする

export const StreakCacheDeleter = () => new Promise((resolve) => {
  caches.open(CURRENT_CACHES.font).then((cache) => {
    cache.keys().then((keyList) => resolve(keyList.map((key: Request) => cache.delete(key))));
  });
});

const ACacheDelete = (URL: string) => new Promise((resolve) => {
  caches.open(CURRENT_CACHES.font).then((cache) => resolve(cache.delete(URL)));
});

const NormalFetcher = (URL: string) => new Promise<any>((resolve) => {
  caches.open(CURRENT_CACHES.font).then((cache) => resolve(fetch(URL).then((res) => {
    const dat = res.clone().json();
    if (res) cache.put(URL, res);
    return dat;
  })));
});

//  集合Xに対してStreakが繋がれているかの一連の確認
//  1:APIを受け取る
//  2:setを作り、Xに合致したものを入れる
//  3:それまでsetに入っていなかったもの かつ 提出が今日であるならば、Streakが繋がれていると判断できる
//  4:そうでなければ、繋がれていない

//  ToDo: Submission型に変換した後は同一関数に投げるようにしたい
interface Submission{
  problemId: string
  date: string
}

interface AtCoderAPI {
  result: string
  problem_id: string
  epoch_second: number
}

interface inCodeforcesAPI{
  verdict: string
  creationTimeSeconds: number
  contestId: number
  index: string
}

interface CodeforcesAPI {
  status: string
  result: inCodeforcesAPI[]
}

interface yukicoderAPI{
  Date: string
  ProblemId: string
}

//  一回のみ呼び出し
//  返り値
//  1: Streakは繋がっている
//  0: Streakは繋がっていない
//  -1: ユーザーが存在しない、もしくは提出履歴がない

//  https://github.com/kenkoooo/AtCoderProblems/blob/master/doc/api.md
//  submissionから得られるオブジェクトの個数は500で固定
const AtCoderStreakFetcher = (UserName: string) => new Promise((resolve) => {
  const API_BASE_URL = 'https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions';
  const SubmissionWithProblemId = new Set();
  const SubmissionWithDate = new Map();
  let epochTimer = 0;
  //  Cacheを確認する
  caches.open(CURRENT_CACHES.font).then((cache) => {
    const CacheFetcher = (async () => {
      //  eslint-disable-next-line no-constant-condition
      while (true) {
        const FetchURL = `${API_BASE_URL}?user=${UserName}&from_second=${epochTimer}`;
        // eslint-disable-next-line no-await-in-loop
        const Res = await cache.match(FetchURL);
        if (!Res) {
          break;
        }
        // eslint-disable-next-line no-await-in-loop
        const ResponseData = await Res.json();
        if (ResponseData.length === 0) {
          break;
        }

        //  ToDo: 言語ごとによるFilterが追加された場合にここにfilterをかける

        //  FilteredSubmissionには条件を満たしたSubmissionのみが残る
        //  ToDo: 計算量を想定する
        const FilteredSubmission: Submission[] = ResponseData.filter((element: AtCoderAPI) => element.result === 'AC').map((element: AtCoderAPI) => ({
          problemId: element.problem_id,
          date: new Date(
            element.epoch_second * 1000,
          ).toLocaleDateString(),
        }));
        FilteredSubmission.forEach((element) => {
          if (!SubmissionWithProblemId.has(element.problemId)) {
            SubmissionWithDate.set(element.date, element.problemId);
            SubmissionWithProblemId.add(element.problemId);
          }
        });
        epochTimer = ResponseData[ResponseData.length - 1].epoch_second + 1;
      }
    });
    return CacheFetcher();
  }).then(() => {
    //  AtCoder Problemsから呼び込む
    const Fetcher = setInterval(() => {
      const FetchURL = `${API_BASE_URL}?user=${UserName}&from_second=${epochTimer}`;
      NormalFetcher(FetchURL).then((responseData) => {
        if (responseData.length === 0) {
          ACacheDelete(FetchURL);
          clearInterval(Fetcher);
          //  ToDo: Streakの日数判定はここで得る
          return resolve(SubmissionWithDate.has(new Date().toLocaleDateString()) ? 1 : 0);
        }

        //  ToDo: 言語ごとによるFilterが追加された場合にここにfilterをかける
        //  FilteredSubmissionには条件を満たしたSubmissionのみが残る
        const FilteredSubmission: Submission[] = responseData.filter((element: AtCoderAPI) => element.result === 'AC').map((element: AtCoderAPI) => ({
          problemId: element.problem_id,
          date: new Date(
            element.epoch_second * 1000,
          ).toLocaleDateString(),
        }));
        FilteredSubmission.forEach((element) => {
          if (!SubmissionWithProblemId.has(element.problemId)) {
            SubmissionWithDate.set(element.date, element.problemId);
          }
        });
        epochTimer = responseData[responseData.length - 1].epoch_second + 1;

        //  unnecessary return(for eslint)
        return epochTimer;
      });
    }, intervalTime);
  });
});

//  https://codeforces.com/apiHelp/methods#user.status
//  submissionにfromがあるため、fromを用意できると嬉しいがある
const CodeforcesStreakFetcher = (UserName: string) => new Promise((resolve) => {
  const API_BASE_URL = 'https://codeforces.com/api/user.status';
  const SubmissionWithProblemId = new Set();
  const SubmissionWithDate = new Map();

  const FetchURL = `${API_BASE_URL}?handle=${UserName}`;
  NormalFetcher(FetchURL).then((responseData: CodeforcesAPI) => {
    //  ToDo: 言語ごとによるFilterが追加された場合にここにfilterをかける
    //  FilteredSubmissionには条件を満たしたSubmissionのみが残る
    const FilteredSubmission: Submission[] = responseData.result.filter((element: inCodeforcesAPI) => element.verdict === 'OK').map((element: inCodeforcesAPI) => ({
      problemId: `${element.contestId}-${element.index}`,
      date: new Date(
        element.creationTimeSeconds * 1000,
      ).toLocaleDateString(),
    }));
    FilteredSubmission.forEach((element) => {
      if (!SubmissionWithProblemId.has(element.problemId)) {
        SubmissionWithDate.set(element.date, element.problemId);
      }
    });

    return resolve(SubmissionWithDate.has(new Date().toLocaleDateString()) ? 1 : 0);
  });
});

//  https://petstore.swagger.io/?url=https://yukicoder.me/api/swagger.yaml
//  APIを得る際にキャッシュはいらないことが知られている(全ての問題に対してのみしかリクエストできないため)
const yukicoderStreakFetcher = (UserName: string) => new Promise((resolve, reject) => {
  const API_BASE_URL = 'https://yukicoder.me/api/v1/solved';
  const today = new Date().toLocaleDateString();
  const submission = new Set();
  let submitted = false;
  axios
    .get(`${API_BASE_URL}/name/${UserName}/first`)
    .then((res) => {
      if (res.data.length === 0) {
        return resolve(-1);
      }
      res.data.forEach((element: yukicoderAPI) => {
        //  今日投げましたか？
        const dataTime = new Date(element.Date).toLocaleDateString();
        const SubmissionDetail = element.ProblemId;
        if (!submission.has(SubmissionDetail) && dataTime === today) {
          submitted = true;
        }
        submission.add(SubmissionDetail);
      });
      return resolve(submitted ? 1 : 0);
    })
    .catch((e) => reject(e));
});

//  ToDo: 言語に関するStreakも用意する

//  全部を統括するFilter関数
export const StreakFetch = (CPSite: string, UserName: string) => new Promise((resolve, reject) => {
  switch (CPSite) {
    case 'AtCoder':
      resolve(AtCoderStreakFetcher(UserName));
      return;
    case 'Codeforces':
      resolve(CodeforcesStreakFetcher(UserName));
      return;
    case 'yukicoder':
      resolve(yukicoderStreakFetcher(UserName));
      return;
    default:
      reject();
  }
});
