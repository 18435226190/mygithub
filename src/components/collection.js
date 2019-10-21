import React from 'react'
import axios from 'axios'
import cut from '../assest/images/index/cut.jpg'
import '../assest/css/index.css'
import man from '../assest/images/index/man.jpg'
import xing from '../assest/images/index/xing.jpg'
import down from '../assest/images/index/down.jpg'
import home from '../assest/images/index/home.jpg'
import { Drawer, List, NavBar, Icon } from 'antd-mobile'

class Collection extends React.Component {
    state={
        open: false,
        dataList:[]
    };
    onOpenChange = (...args) => {
        this.setState({ open: !this.state.open });
    };
    render(){
//------------切换--------------
        const sidebar = (<List>
            <List.Item >
                <div style={{"background":"#00a2ed","height":"2.1rem","padding-top":"0.2rem"}}>
                    <div style={{"line-height":"0.66rem","font-size":"0.3rem","color":"#fff","margin-bottom":"0.65rem"}}>
                        <img src={man} alt="" style={{"width":"0.7rem","height":"0.7rem","margin":"0 0.37rem 0 0.4rem","vertical-align":"middle"}}/> 我的名字
                    </div>
                    <div style={{"line-height":"0.3rem","font-size":"0.3rem","color":"#fff"}}>
                        <img src={xing} alt="" style={{"margin":"0 0.47rem"}} /><span style={{"color":"#fff","vertical-align":"middle"}} onClick={this.onOpenChange}>我的收藏</span>
                        <img src={down} alt="" style={{"margin":"0 0.47rem"}}/>离线下载
                    </div>
                </div>
                <div onClick={this.to.bind(this)} style={{"height":"1rem","line-height":"1rem","background":"#f0f0f0",}}>
                    <img src={home} alt="" style={{"width":"0.4rem","height":"0.32rem","margin":"0 0.33rem 0 0.43rem"}} /><span style={{"color":"#3687b6","font-size":"0.28rem"}}>首页</span>
                </div>
            </List.Item>

        </List>);

        return (
            <div id="collection" >
                <div  style={{"position":"relative"}}>
                    <div className="head">
                        <img src={cut} alt="" style={{"margin":"0 0.69rem 0 0.5rem","width":"0.39rem","vertical-align":"middle"}} onClick={this.onOpenChange} />
                        2条收藏
                    </div>
                    <Drawer
                        className="my-drawer"
                        style={{ minHeight: document.documentElement.clientHeight }}
                        enableDragHandle
                        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                        sidebar={sidebar}
                        open={this.state.open}
                        onOpenChange={this.onOpenChange}
                    >
                    </Drawer>
                </div>
                <div id="important">
                    <ul>
                    {
                        this.state.dataList.map((val,i)=>{
                           return <li key={i} onClick={this.link.bind(this,val.id)} style={{"padding":"0.36rem 0.15rem 0.29rem 0.32rem","background":"#fff","border-radius":"0.2rem","margin-bottom":"0.16rem"}}>
                               <em style={{"width":"4rem"}}>{val.title}</em>
                               <img className="fr" src={val.image[0]} alt=""/>
                           </li>
                        })
                    }
                    </ul>
                </div>
            </div>
        )
    }
    componentDidMount(){
        var arr=[];
        for(let i=0;i<localStorage.length;i++){
            console.log(Number(localStorage.key(i)));
            if(Number(localStorage.key(i))){
                arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
            }
        }
        console.log(arr);
        this.setState({
            dataList:arr
        });

        document.getElementsByClassName('am-drawer-sidebar')[0].style.position='fixed';
        document.getElementsByClassName('am-drawer-sidebar')[0].style.top='0';
        document.getElementsByClassName('am-drawer-overlay')[0].style.position='fixed'

    }
    link(x){
        this.props.history.push({
            pathname:'/detail',
            state:{
                sid:x
            }
        })
    }
    to(){
        this.props.history.push({
            pathname:'/index',
        })
    }
}
export default Collection;
