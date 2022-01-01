import React, { useState } from 'react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';

import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

import Title from '../atoms/Title';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Dropdown from '../atoms/Dropdown';

import StreakFetcher from '../../utils/Streak';

const StyledDiv = styled.div`
  height: calc(100vh - 140px);
  width: 100vw;
`;

function Top() {
  const [status, setStatus] = useState('let fill the input field above!');
  const InputData = React.createRef<HTMLInputElement>();
  const TargetedCPSite = React.createRef<HTMLSelectElement>();
  const ScriptData = () => {
    const UserName = InputData.current.value;
    const SelectedCPSite = TargetedCPSite.current.value;
    //  ToDo:ボタンを押した時、Inputの中身を固定状態にする → クロールが終わったら解除する

    if (!UserName) {
      setStatus('Input has no data');
      return;
    }
    setStatus('Fetching...');
    StreakFetcher(SelectedCPSite, UserName).then((ret) => {
      if (ret === 1) {
        setStatus('Unique accepted');
      } else if (ret === 0) {
        setStatus('Not unique accepted');
      } else {
        setStatus('Error');
      }
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
        <Grid item xs={12} style={{ textAlign: 'center', margin: '50px' }}>
          <Button label="Go!" action={ScriptData} />
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center', margin: '50px' }}>
          <div>{status}</div>
        </Grid>
      </StyledDiv>
      <Footer />
    </>
  );
}

export default Top;
