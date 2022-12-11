import React from 'react';

import styles from './index.module.less'
import Msg from '../components/Msg/index'

function App(props) {
    return <div className={styles.app}>
        {props.children}
        {/*提示组件*/}
        <Msg/>
    </div>
}

export default App;
