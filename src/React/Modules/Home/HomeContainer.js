import React, { useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  requestHomeModuleInfo,
} from "../../ReduxSaga/Actions/Home";

const HomeContainer = () => {
  
  const dispatch = useDispatch();

  const appReducers = {};
  appReducers.user = useSelector((state) => state.user);
  appReducers.home = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(requestHomeModuleInfo());
  },[])

  return (
    <Fragment>HomeContainer</Fragment>
  );
};

export default HomeContainer;