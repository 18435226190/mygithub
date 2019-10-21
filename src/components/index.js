import React from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import '../assest/css/index.css'
import cut from '../assest/images/index/cut.jpg'
import man from '../assest/images/index/man.jpg'
import xing from '../assest/images/index/xing.jpg'
import down from '../assest/images/index/down.jpg'
import home from '../assest/images/index/home.jpg'
import message from '../assest/images/index/message.jpg'
import set from '../assest/images/index/set.jpg'
import { Drawer, List, NavBar, Icon } from 'antd-mobile'
import { Carousel, WingBlank } from 'antd-mobile';
import $ from "jquery"
const weekArr=["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
var tag=true;
var boolean = true;
class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            data: [],
            imgHeight: 176,
            news:[],
            arr:[],
            name:"首页"
        };
    }

    onOpenChange = (...args) => {
        this.setState({ open: !this.state.open });
    };
    render() {
//--------------------切换----------------------------
        const sidebar = (<List>
               <List.Item >
                   <div style={{"background":"#00a2ed","height":"2.1rem","padding-top":"0.2rem"}}>
                        <div style={{"line-height":"0.66rem","font-size":"0.3rem","color":"#fff","margin-bottom":"0.65rem"}}>
                            <img src={man} alt="" style={{"width":"0.7rem","height":"0.7rem","margin":"0 0.37rem 0 0.4rem","vertical-align":"middle"}}/> My name
                        </div>
                       <div style={{"line-height":"0.3rem","font-size":"0.3rem","color":"#fff"}}>
                           <img src={xing} alt="" style={{"margin":"0 0.47rem"}} onClick={this.linkTo.bind(this)} /><span style={{"color":"#fff","vertical-align":"middle"}} onClick={this.linkTo.bind(this)}>我的收藏</span>
                           <img src={down} alt="" style={{"margin":"0 0.47rem"}}/>离线下载
                       </div>
                   </div>
                   <div style={{"height":"1rem","line-height":"1rem","background":"#f0f0f0","color":"#3687b6","font-size":"0.28rem"}}  onClick={this.onOpenChange}>
                       <img src={home} alt="" style={{"width":"0.4rem","height":"0.32rem","margin":"0 0.33rem 0 0.43rem"}}/>首页
                   </div>
               </List.Item>

        </List>);
        return (
            <div id="index">
 {/*--------------换组件--------------*/}
        <div style={{"position":"relative"}}>
            {/*----头部----*/}
                    <div className="head">
                        <img src={cut}  style={{"margin":"0 0.72rem 0 0.39rem","width":"0.4rem"}} onClick={this.onOpenChange} />
                        {this.state.name}
                        <img className="fr" src={set} alt="" style={{"margin":"0 0.34rem 0 0.71rem","width":"0.19rem",'margin-top':'0.37rem'}} />
                        <img className="fr" src={message} style={{"width":"0.39rem",'margin-top':'0.37rem'}}  onClick={this.onOpenChange} />
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
               {/*-------banner图-------*/}
                <div style={{"background":"#000","padding-bottom":"0.02rem"}}>
                    <WingBlank>
                        <Carousel
                            autoplay={true}
                            infinite={true}
                            // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                            // afterChange={index => console.log('slide to', index)}
                        >
                            {this.state.data.map(val => (
                                <a
                                    key={val}
                                    href="http://www.alipay.com"
                                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                    <span style={{"color":"#fff","position":"absolute","top":"2rem","left":"0","font-size":"0.38rem","padding":"0 0.3rem"}}>{val.title}</span>
                                    <img
                                        src={val.image}
                                        alt=""
                                        style={{ "width": '7.2rem', "vertical-align": 'top' }
                                       }
                                    />
                                </a>
                            ))}
                        </Carousel>
                    </WingBlank>
                </div>
<div id="important">
                {/*-------热门新闻-------*/}
                {this.state.arr.map((val,index)=>{
                  return  <div style={{"background":"#f3f3f3"}} className="box" key={index}>
                        <span style={{"line-height":"1.07rem","padding-left":"0.34rem"}}>{val.title}</span>
                        <ul style={{"padding":"0 0.16rem"}}>
                            {
                                val.news.map((val,i)=>{
                                    return <li key={i} onClick={this.link.bind(this,val.id)} style={{"padding":"0.36rem 0.15rem 0.29rem 0.32rem","background":"#fff","border-radius":"0.2rem","margin-bottom":"0.16rem"}}>
                                        <em style={{"width":"4rem"}}>{val.title}</em>
                                        <img src={val.images[0]} style={{"width":"1.72rem","margin-left":"0.3rem",}} />
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                })}
                </div>
            </div>
        )
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                // data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
        var dataList=[];
        axios.get('/api/4/news/latest').then(res=>{
            console.log(res.data);
            this.setState({
                data:res.data.top_stories,
                news:res.data.stories,
                arr:[{
                    title:"今日热闻",
                    news:res.data.stories
                }]
            });
            dataList=[{
                title:"今日热闻",
                news:res.data.stories
            }]
        });

        //处理时间
        var year = new Date().getFullYear().toString();
        var mouth = new Date().getMonth()+1 < 10 ? "0" +(new Date().getMonth()+1)  : new Date().getMonth()+1;
        var day = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();
        var week=new Date().getDay()-1;
        var time=year+mouth+day;
        var _this = this;

        //滚动  文档实际高度 = 屏幕的可视高度 + 卷去高度
        window.onscroll = function () {
            console.log(document.body.clientHeight) //文档的可视高度
            console.log(document.documentElement.scrollHeight)
            //2.获取屏幕可视高
            var dTop = document.documentElement.scrollHeight ; //文档实际高度
            var cTop = document.documentElement.clientHeight;  //屏幕的可视高度
            var sTop = document.documentElement.scrollTop ;    //卷去高度
            dataList=_this.state.arr;
            var dataList =_this.state.arr;
            var index=fun();
            _this.setState({
                name:dataList[index].title
            });
            // 3.判断，只要img在小于屏幕高，都能显示
                if(sTop >= dTop - cTop){
                    axios.get('/api/4/news/before/'+time).then(res=>{
                        time=res.data.date;
                        week--;
                        if(week==-1){week=6}
                        dataList.push({
                            title:res.data.date.substr(4,2)+"月"+res.data.date.substr(6,2)+"日"+' ' +weekArr[week],
                            news:res.data.stories
                        });
                        _this.setState({
                            arr:dataList,
                        })
                    });
                 }
            if(document.documentElement.scrollTop<=176){
                _this.setState({
                    name:"首页"
                });
            }
        };
        document.getElementsByClassName('am-drawer-sidebar')[0].style.position='fixed';
        document.getElementsByClassName('am-drawer-overlay')[0].style.position='fixed';
        document.getElementsByClassName('am-drawer-sidebar')[0].style.top='0';
   }
    link(x){
        this.props.history.push({
            pathname:'/detail',
            state:{
                sid:x
            }
        })
    }
    linkTo(ev){
        var ev = window.event || ev;
        ev.stopPropagation?ev.stopPropagation():ev.cancelBubble = true;
        this.props.history.push({
            pathname:"/collection",
        })

    }
}
console.log($("#index"));
function fun() {
    var n = 0;
    Array.from(document.getElementsByClassName('box')).map((val,index)=> {
        if(document.documentElement.scrollTop>=val.offsetTop){
            n=index;
        }
    });
    return n
}
export default Index;
//标签容器