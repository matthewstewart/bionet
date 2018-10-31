import React, { Component } from 'react';
import Api from '../../modules/Api';
import Menu from '../partials/Menu/Menu';
import Loading from '../partials/Loading/Loading';
import ForceGraph from '../partials/ForceGraph/ForceGraph';
import './Landing.css';

class Landing extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      errors: [],
      users: [],
      labs: []
    };
    this.getData = this.getData.bind(this);
  }

  async getData() {
    let state = this.state;
    
    let getUsers = await Api.getAll('users');
    if (!getUsers.success) { this.state.errors.push(getUsers.error); this.props.setAlert('error', `${getUsers.message}: ${getUsers.error.code} - ${getUsers.error.message}`)} else { state.users = getUsers.users; }
    
    let getLabs = await Api.getAll('labs');
    if (!getLabs.success) { this.state.errors.push(getLabs.error); this.props.setAlert('error', `${getLabs.message}: ${getLabs.error.code} - ${getLabs.error.message}`)} else { state.labs = getLabs.labs; }
    
    if (state.errors.length === 0){
      state.success = true;
    }
    return state;
  }

  componentDidMount() {
    this.getData()
    .then((res) => {
      this.setState(res);
      this.props.setReady(true);
    });
  }

  render() {
    return (
      <Loading {...this.props}>
        <div className="Landing container-fluid">
          <div className="row">
            <div className="col-12 col-lg-5">
              <Menu />
            </div>
            <div className="col-12 col-lg-5">
              <ForceGraph 
                {...this.props}
                {...this.state}
              />
            </div>  
          </div>
        </div>
      </Loading>
    );
  }

}

export default Landing;  