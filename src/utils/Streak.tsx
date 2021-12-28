import axios from 'axios'


//一回のみ呼び出し
const StreakFetcher = (UserName: string) => {
return new Promise((resolve,reject) => {
  let epochTimer = 0;
  let submission = new Set()
  let submitted = false;
  console.log("crawling...");
  const Fetcher = setInterval(() => {
    axios.get(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=${UserName}&from_second=${epochTimer}`).then((res) => {
      epochTimer = res.data[res.data.length-1].epoch_second;
      console.log(epochTimer,res.data[res.data.length-1].problem_id,res.data.length)
      res.data.forEach((element) => {
        if(element.result === "AC"){
          //今日投げましたか？
          const dataTime = new Date(element.epoch_second*1000);
          const today = new Date();
          if(dataTime.toLocaleDateString() === today.toLocaleDateString()){
            submitted = true;
          }
          //setに挿入
          submission.add(element.problem_id);
        }
      })
      if(res.data.length < 500){
        console.log("crawled!",submitted);
        clearInterval(Fetcher);
        return resolve(submitted);
      }
    });
  },3000);
  
})
}

export default StreakFetcher