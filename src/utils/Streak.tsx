import axios from 'axios';

const CACHE_VERSION = 1;
const CURRENT_CACHES = {
  font: `font-cache-v${CACHE_VERSION}`,
};

//  ToDo:それぞれのサイトに対してのStreakに関する返り値を同じにする

interface cacher {
  cache: boolean;
  data: any; // ToDo: 後でどうにかします
}

//  ToDo: キャッシュを削除する
export const CasheDeleter = () => new Promise((resolve) => {
  caches.open(CURRENT_CACHES.font).then((cache) => {
    cache.keys().then((keyList) => resolve(keyList.map((key: Request) => cache.delete(key))));
  });
});

const ACacheDelete = (URL) => new Promise((resolve) => {
  caches.open(CURRENT_CACHES.font).then((cache) => resolve(cache.delete(URL)));
});

const StreakCacher = (URL: string) => new Promise<cacher>((resolve) => {
  caches.open(CURRENT_CACHES.font).then((cache) => cache.match(URL).then((res) => {
    if (!res) {
      return null;
    }
    return res.json();
  }).then((response) => {
    if (response) {
      return resolve({ cache: true, data: response });
    }
    return resolve({
      cache: false,
      data: fetch(URL).then((res) => {
        const dat = res.clone().json();
        if (res) cache.put(URL, res);
        return dat;
      }),
    });
  }));
});

//  集合Xに対してStreakが繋がれているかの一連の確認
//  1:APIを受け取る
//  2:setを作り、Xに合致したものを入れる
//  3:それまでsetに入っていなかったもの かつ 提出が今日であるならば、Streakが繋がれていると判断できる
//  4:そうでなければ、繋がれていない

//  一回のみ呼び出し
//  返り値
//  1: Streakは繋がっている
//  0: Streakは繋がっていない
//  -1: ユーザーが存在しない、もしくは提出履歴がない

//  https://github.com/kenkoooo/AtCoderProblems/blob/master/doc/api.md
//  submissionから得られる返り値は500で固定
const AtCoderStreakFetcher = (UserName: string) => new Promise((resolve, reject) => {
  const API_BASE_URL = 'https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions';
  const today = new Date().toLocaleDateString();
  const submission = new Set();
  const intervalTime = 3000;
  let submitted = false;
  let allSubmission = 0;
  let epochTimer = 0;
  const Fetcher = setInterval(() => {
    const FetchURL = `${API_BASE_URL}?user=${UserName}&from_second=${epochTimer}`;
    StreakCacher(FetchURL).then((response) => response.data).then((res) => {
      //  ToDo: Cacheが残っているのならSetintevalの時間を0msとする
      if (res.length === 0) {
        ACacheDelete(FetchURL);
        clearInterval(Fetcher);
        resolve(submitted ? 1 : 0);
        return;
      }
      allSubmission += res.length;
      if (allSubmission === 0) {
        clearInterval(Fetcher);
        reject();
      }

      epochTimer = res[res.length - 1].epoch_second + 1;
      res.forEach((element) => {
        if (element.result === 'AC') {
          //  今日投げましたか？
          const dataTime = new Date(
            element.epoch_second * 1000,
          ).toLocaleDateString();
          const SubmissionDetail = element.problem_id;
          if (!submission.has(SubmissionDetail) && dataTime === today) {
            submitted = true;
          }
          submission.add(SubmissionDetail);
        }
      });
    });
  }, intervalTime);
});

//  https://codeforces.com/apiHelp/methods#user.status
//  submissionにfromがあるため、fromを用意できると嬉しいがある
const CodeforcesStreakFetcher = (UserName: string) => new Promise((resolve, reject) => {
  const API_BASE_URL = 'https://codeforces.com/api/user.status';
  const today = new Date().toLocaleDateString();
  const submission = new Set();
  let submitted = false;
  axios
    .get(`${API_BASE_URL}?handle=${UserName}`)
    .then((res) => {
      if (res.data.length === 0) {
        return resolve(-1);
      }
      for (let i = res.data.result.length - 1; i >= 0; i -= 1) {
        const element = res.data.result[i];
        if (element.verdict === 'OK') {
          //  今日投げましたか？
          const dataTime = new Date(
            element.creationTimeSeconds * 1000,
          ).toLocaleDateString();
          const SubmissionDetail = {
            ContestId: element.contestid,
            ProblemIndex: element.index,
          };
          if (!submission.has(SubmissionDetail) && dataTime === today) {
            submitted = true;
          }
          submission.add(SubmissionDetail);
        }
      }
      return resolve(submitted ? 1 : 0);
    })
    .catch((e) => reject(e));
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
      res.data.forEach((element) => {
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

//  ToDo 言語に関するStreakも用意する

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
