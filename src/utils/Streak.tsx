import axios from 'axios'

//ToDo:それぞれのサイトに対してのStreakに関する返り値を同じにする


//一回のみ呼び出し
//返り値
//1: Streakは繋がっている
//0: Streakは繋がっていない
//-1: ユーザーが存在しない、もしくは提出履歴がない
const AtCoderStreakFetcher = (UserName: string) => {
return new Promise((resolve,reject) => {
  let epochTimer = 0;
  let submission = new Set()
  let submitted = false;
  let allSubmission = 0;
  console.log("crawling...");
  const Fetcher = setInterval(() => {
    axios.get(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=${UserName}&from_second=${epochTimer}`).then((res) => {
      allSubmission += res.data.length;  
      if(allSubmission === 0){
        return resolve(-1);
      }
      console.log(res);
      epochTimer = res.data[res.data.length-1].epoch_second;
      console.log(epochTimer,res.data[res.data.length-1].problem_id,res.data.length)
      res.data.forEach((element) => {
        if(element.result === "AC"){
          //今日投げましたか？
          const dataTime = new Date(element.epoch_second*1000);
          const today = new Date();
          if(!submission.has(element.problem_id) && dataTime.toLocaleDateString() === today.toLocaleDateString()){
            submitted = true;
          }
          //setに挿入
          submission.add(element.problem_id);
          
        }
      })
      if(res.data.length < 500){
        console.log("crawled!",submitted);
        clearInterval(Fetcher);
        return resolve(submitted?1:0);
      }
    }).catch((e) => {

    });
  },3000);
  
})
}

export default AtCoderStreakFetcher


//ToDo:Codeforces



//ToDo: yukicoder


//ToDo 言語に関するStreakも用意する