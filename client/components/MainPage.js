import React, {useState, useEffect} from "react";
import Copyright from './common/Copyright';
import WSClient from '../socket/client';
import { connect } from "react-redux";
const MainPage = (props) => {
    const [ user , setUser ] = useState(0);
    useEffect(() => {
        WSClient.connect(props.userId);
        WSClient.startListenUpdateUser(setUser);
        return () => {
            WSClient.shutdownWS();
        }
    }, [])

    return (
        <>
            <p>Tổng cộng: {user} đang online</p>
            <Copyright/>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
      userId: state.auth.id,
    };
  };
  
  export default connect(mapStateToProps)(MainPage);
