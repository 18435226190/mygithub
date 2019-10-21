import React from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import Index from '../components/index'
import Detail from '../components/detail'
import Comment from '../components/comment'
import Collection from '../components/collection'
const pathArr=[
    {
        path:'/index',
        component:Index
    },
    {
        path:'/detail',
        component:Detail
    },
    {
        path:'/comment',
        component:Comment
    },
    {
        path:'/collection',
        component:Collection
    },
    {
        path:'*',
        redirect:'/index'
    },
];
const Router = ()=>{
    console.log();
    return (
        <div>
            <Switch>
                {
                    pathArr.map((val,i)=>{
                        if(val.path==='*'){
                            return  <Redirect key={i} to={val.redirect} />
                        }else{
                            return  <Route key={i} path={val.path} component={val.component}/>
                        }
                    })
                }


            </Switch>
        </div>
    )
};

export default Router
