import axios from 'axios';

//  ToDo:それぞれのサイトに対してのStreakに関する返り値を同じにする

//  一回のみ呼び出し
//  返り値
//  1: Streakは繋がっている
//  0: Streakは繋がっていない
//  -1: ユーザーが存在しない、もしくは提出履歴がない
const AtCoderStreakFetcher = (UserName: string) => new Promise((resolve, reject) => {
  const API_BASE_URL = 'https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions';
  const today = new Date().toLocaleDateString();
  const submission = new Set();
  let submitted = false;
  let allSubmission = 0;
  let epochTimer = 0;
  const Fetcher = setInterval(() => {
    axios
      .get(`${API_BASE_URL}?user=${UserName}&from_second=${epochTimer}`)
      .then((res) => {
        allSubmission += res.data.length;
        if (allSubmission === 0) {
          clearInterval(Fetcher);
          reject();
        }
        epochTimer = res.data[res.data.length - 1].epoch_second;
        res.data.forEach((element) => {
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
        if (res.data.length < 500) {
          clearInterval(Fetcher);
          resolve(submitted ? 1 : 0);
        }
      })
      .catch((e) => reject(e));
  }, 3000);
});

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
const StreakFetcher = (CPSite: string, UserName: string) => new Promise((resolve, reject) => {
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

export default StreakFetcher;
