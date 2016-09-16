import React from 'react';
import {Link} from 'react-router';
import {BASE_URL} from '../constants';

const UserName = (props)=><Link to ={BASE_URL + 'profile/'+props.id+'/'}>{props.name}</Link>;

export default UserName;










