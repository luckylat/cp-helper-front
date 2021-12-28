import axios from 'axios'


//一回のみ呼び出し
const StreakFetcher = (UserName: string) => {
  let epochTimer = 0;
  console.log("crawling...")
  const fetcher = setInterval(() => {
    axios.get(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=${UserName}&from_second=${epochTimer}`).then((res) => {
      epochTimer = res.data[res.data.length-1].epoch_second;
      const dataTime = new Date(epochTimer*1000);
      console.log(dataTime.toString(),res.data[res.data.length-1].problem_id,res.data.length)
      if(res.data.length < 500){
        console.log("crawled!")
        clearInterval(fetcher);
      }
    });
    
  },2000);


}

export default StreakFetcher