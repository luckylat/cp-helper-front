import React, { useState } from 'react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';

import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

import Title from '../atoms/Title';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Dropdown from '../atoms/Dropdown';

import { StreakFetch, CasheDeleter } from '../../utils/Streak';

const StyledDiv = styled.div`
  height: calc(100vh - 140px);
  width: 100vw;
`;

function Top() {
  const [status, setStatus] = useState('let fill the input field above!');
  const [cacheStatus, setCacheStatus] = useState('');
  const InputData = React.createRef<HTMLInputElement>();
  const TargetedCPSite = React.createRef<HTMLSelectElement>();
  const StreakFetcher = () => {
    const UserName = InputData.current.value;
    const SelectedCPSite = TargetedCPSite.current.value;
    //  ToDo:ボタンを押した時、Inputの中身を固定状態にする → クロールが終わったら解除する

    if (!UserName) {
      setStatus('Input has no data');
      return;
    }
    setStatus('Fetching...');
    setCacheStatus('');
    StreakFetch(SelectedCPSite, UserName).then((ret) => {
      if (ret === 1) {
        setStatus('Unique accepted');
      } else if (ret === 0) {
        setStatus('Not unique accepted');
      } else {
        setStatus('Error');
      }
    });
  };
  const CacheDelete = () => {
    setCacheStatus('Cache Deleting');
    CasheDeleter().then(() => {
      setCacheStatus('Cache Deleted');
    });
  };

  const cpSite = {
    AtCoder: 'AtCoder',
    Codeforces: 'Codeforces',
    yukicoder: 'yukicoder',
  };
  return (
    <>
      <Header />
      <StyledDiv>
        <Grid item xs={12} style={{ margin: '50px' }}>
          <Title value="CP-Streak-Helper" size={40} />
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center', margin: '50px' }}>
          <Dropdown
            ref={TargetedCPSite}
            items={Object.keys(cpSite).map((item: string) => ({ text: item }))}
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center', margin: '50px' }}>
          <Input ref={InputData} placeholder="Username" />
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center', margin: '35px' }}>
          <Button label="Go!" action={StreakFetcher} />
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center', margin: '35px' }}>
          <Button label="Cache Delete" action={CacheDelete} />
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center', margin: '20px' }}>
          <div>{status}</div>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center', margin: '20px' }}>
          <div>{cacheStatus}</div>
        </Grid>
      </StyledDiv>
      <Footer />
    </>
  );
}

export default Top;
