import axios from 'axios'

//ToDo:それぞれのサイトに対してのStreakに関する返り値を同じにする


//一回のみ呼び出し
//返り値
//1: Streakは繋がっている
//0: Streakは繋がっていない
//-1: ユーザーが存在しない、もしくは提出履歴がない
const AtCoderStreakFetcher = (UserName: string) => {
  return new Promise((resolve,reject) => {
    const API_BASE_URL = "https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions";

    let epochTimer = 0;
    const today = new Date();
    let submission = new Set()
    let submitted = false;
    let allSubmission = 0;
    console.log("crawling...");
    const Fetcher = setInterval(() => {
      axios.get(`${API_BASE_URL}?user=${UserName}&from_second=${epochTimer}`).then((res) => {
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
        //TODO: 後でやる
      });
    },3000);
    
  })
}



//ToDo:Codeforces

const CodeforcesStreakFetcher = (UserName: string) => {
  return new Promise((resolve,reject) => {
    const API_BASE_URL = "https://codeforces.com/api/user.status";

    let submission = new Set()
    const today = new Date();
    let submitted = false;
    console.log("crawling...");
    axios.get(`${API_BASE_URL}?handle=${UserName}`).then((res) => {
      if(res.data.length === 0){
        return resolve(-1);
      }
      for(let i = res.data.result.length-1; 0 <= i; i--){
        const element = res.data.result[i];
        if(element.verdict === "OK"){
          //今日投げましたか？
          const dataTime = new Date(element.creationTimeSeconds*1000);
          if(!submission.has({ContestId:element.contestid,ProblemIndex:element.index}) && dataTime.toLocaleDateString() === today.toLocaleDateString()){
            submitted = true;
          }
          //setに挿入
          submission.add({ContestId:element.contestid,ProblemIndex:element.index});
          
        }
      }
      console.log("crawled!",submitted);
      return resolve(submitted?1:0);
    }).catch((e) => {
      console.log(e);
      return resolve(-1);
      //TODO: 後でやる
    });
    
  })
}

//ToDo: yukicoder
const yukicoderStreakFetcher = (UserName: string) => {
  return new Promise((resolve,reject) => {
    const API_BASE_URL = "https://yukicoder.me/api/v1/solved"

    let submission = new Set()
    const today = new Date();
    let submitted = false;
    console.log("crawling...");
    axios.get(`${API_BASE_URL}/name/${UserName}/first`).then((res) => {
      if(res.data.length === 0){
        return resolve(-1);
      }
      console.log(res);
      res.data.forEach((element) => {
        //今日投げましたか？
        
        const dataTime = new Date(element.Date);
        if(!submission.has({ContestId:element.contestid,ProblemIndex:element.index}) && dataTime.toLocaleDateString() === today.toLocaleDateString()){
          submitted = true;
        }
        //setに挿入
        submission.add({ContestId:element.contestid,ProblemIndex:element.index});
      })
      console.log("crawled!",submitted);
      return resolve(submitted?1:0);
    }).catch((e) => {
      console.log(e);
      return resolve(-1);
      //TODO: 後でやる
    });
    
  })
}


//ToDo 言語に関するStreakも用意する

//全部を統括するFilter関数
const FilterOfStreakFetcher = (CPSite:string, UserName:string) => {
  return new Promise((resolve,reject) => {
    switch(CPSite){
      case 'AtCoder':
        return resolve(AtCoderStreakFetcher(UserName));
      case 'Codeforces':
        return resolve(CodeforcesStreakFetcher(UserName));
      case 'yukicoder':
        return resolve(yukicoderStreakFetcher(UserName));
      default:
        return resolve(-1);
    }
  })

}
export default FilterOfStreakFetcher