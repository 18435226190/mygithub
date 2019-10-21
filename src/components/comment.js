import React from 'react'
import axios from 'axios'
import back from '../assest/images/detail/back.jpg'
import zan from '../assest/images/zan.jpg'
import text from '../assest/images/text.jpg'
import empty from '../assest/images/empty.jpg'
import none from '../assest/images/detail/none.jpg'
import block from '../assest/images/detail/block.jpg'
import agr from '../assest/images/detail/agreen.jpg'
import $ from 'jquery'
import { Accordion, List } from 'antd-mobile';
// import collect from '../assest/images/detail/collect.jpg'
// import comment from '../assest/images/detail/comment.jpg'
// import nice from '../assest/images/detail/nice.jpg'
import '../assest/css/index.css'
var x=0;
var y=0;
var arr=[];
class Comment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            long:[],
            short:[],
            title:'',
            tag:true
        };
    }
    render(){
        return (

            <div id="comment">
                <div className="head" >
                    <img src={back} alt="" onClick={this.back.bind(this)} style={{"margin-left":"0.5rem","width":"0.33rem"}} />
                    <span style={{"margin-left":"0.58rem","color":"#fff"}}>{this.state.long.length+this.state.short.length}条点评</span>
                    <img className="fr" src={text} alt="" style={{"margin":"0.3rem 0.5rem 0 0","width":"0.33rem"}} />
                </div>
                {/*--长评--*/}
                <div  className="body" style={{"margin-top":"0"}} >
                    <p id="p" style={{"margin":"0"}}>{this.state.long.length}条长评</p>
                    <ul style={{"padding-left":"0"}} id="one">
                        {this.state.long.map((val,i)=>{

                            return    <li  key={i}>
                                <img  onClick={this.chose.bind(this,0,i)} src={val.avatar}  style={{"width":"0.7rem"}} alt="" />
                                <span className="middle" style={{"margin-left":"0.13rem"}}>
                                <i onClick={this.chose.bind(this,0,i)}>{val.author}</i>
                                <em onClick={this.chose.bind(this,0,i)} className="fr like" style={{"font-size":"0.2rem","vertical-align": "middle"}}>{val.likes}</em>
                                <img onClick={this.chose.bind(this,0,i)} className="fr imgs" style={{"width":"0.24rem","margin": "0.08rem 0.1rem 0 0 "}} src={zan} alt=""/>
                                <em onClick={this.chose.bind(this,0,i)}>{val.content}</em>
                                {

                                    (()=> {
                                        if(val.reply_to){
                                            return <span>
                                                <span id="open" className="display" onClick={this.chose.bind(this,0,i)}><span>//{val.reply_to.author}</span>: {val.reply_to.content}</span>
                                                <b id="display" onClick={this.open.bind(this)}>展开</b></span>

                                        }
                                    })()

                                }
                                <em onClick={this.chose.bind(this,0,i)} style={{"margin-top":"0.21rem"}}>{val.time}</em>
                            </span>
                            </li>
                        })}
                    </ul>
                    <div id="two" style={{"display":"none","text-align":"center","height":"10rem"}}>
                        <img src={empty} style={{"width":"2.87rem","margin-top":"4rem"}} alt=""/><br/>
                        <span>深度长评虚位以待</span>
                    </div>
                </div>
                {/*--短评---*/}
                <div  className="body" style={{"margin-top":"0"}} id="short">
                    <p style={{"margin":"0"}}  onClick={this.change.bind(this)} >{this.state.short.length}条短评 <span className="fr" style={{"margin-right":"0.5rem"}}><img
                        src={none} style={{"width":"0.3rem"}} id="img" /></span></p>
                        <ul id="shortComment" style={{display:"none"}}>
                                {
                                    this.state.short.map((val,i)=>{
                                  return (
                                      <li key={i}  style={{"padding": "0.36rem 0 .38rem 0.3rem","border-bottom": "0.02rem solid #e0e0e0"}}>
                                       <img src={val.avatar} onClick={this.chose.bind(this,1,i)}  style={{"width":"0.7rem","height":"0.7rem","border-radius":"50%"}} alt="" />
                                       <span  className="middle" style={{"width":"5rem","margin-left":"0.13rem"}}>
                                       <i style={{"margin-bottom":"0.2rem"}}  onClick={this.chose.bind(this,1,i)} >{val.author}</i>
                                       <em className="fr like" style={{"font-size":"0.2rem","vertical-align": "middle"}}  onClick={this.chose.bind(this,1,i)} >{val.likes}</em>
                                       <img className="fr imgs"  onClick={this.chose.bind(this,1,i)}  style={{"width":"0.24rem","height":"0.22rem","margin": "0.08rem 0.1rem 0 0 "}} tag='true' src={zan} alt=""/>
                                <em  onClick={this.chose.bind(this,1,i)}  style={{"display":"block"}}>{val.content}</em>
                                    {

                                        (()=> {
                                            if(val.reply_to){
                                                return <span><span id="open" className="display"  onClick={this.chose.bind(this,1,i)} ><span>//{val.reply_to.author}</span>: {val.reply_to.content}</span><b id="display" onClick={this.open.bind(this)}>展开</b></span>

                                            }
                                        })()

                                }
                                <em  onClick={this.chose.bind(this,1,i)}  style={{"margin-top":"0.21rem","display":"block"}}>{val.time}</em>

                            </span>

                                      </li>)
                                    })
                                }
                        </ul>
                    </div>
                {/*-----------赞同的蒙版----------*/}
                <div id="meng" style={{display:'none'}}>
                    <div onClick={this.noneChose.bind(this)} style={{"background":"rgba(0,0,0,0.4)",'position':'fixed','left':'0','top':'0','width':'100%',"height":'20rem'}}></div>
                    <ul style={{position:'fixed','width':'80%',background:'#fff','left':'10%','top':"30%",height:'2.7rem','padding':'0.4rem 0'}}>
                    <li id="yes" onClick={this.agreen.bind(this)} style={{'padding-left':'0.4rem','margin-bottom':'0.5rem'}}>赞同</li>
                    <li style={{'padding-left':'0.4rem','margin-bottom':'0.5rem'}}>举报</li>
                    <li style={{'padding-left':'0.4rem','margin-bottom':'0.5rem'}}>复制</li>
                    <li style={{'padding-left':'0.4rem'}}>回复</li>
                    </ul>
                </div>
                </div>

        )
    }
    componentDidMount(){
        console.log(this.props.location.state.sid);
        axios.get("/api/4/story/"+this.props.location.state.sid+"/long-comments").then(res=>{
                res.data.comments.map((val)=>{
                    val.time=time(val.time).substring(5);
            });
            console.log(res.data.comments,111111);
            if(res.data.comments.length===0){
                document.getElementById("one").style.display='none';
                document.getElementById("two").style.display='block'
            }else{
                document.getElementById("one").style.display='block';
                document.getElementById("two").style.display='none'
            }
            this.setState({
                long: res.data.comments
            })
        });
        axios.get("/api/4/story/"+this.props.location.state.sid+"/short-comments").then(res=>{
            res.data.comments.map((val)=>{
                val.time=time(val.time).substring(5);
            });
            this.setState({
                short: res.data.comments,
                title:res.data.comments.length+'条短评'
            })
        });

    }
    back(){
        this.props.history.push({
            pathname:'/detail',
            state:{
                sid:this.props.location.state.sid
            }
        })
        // this.props.history.go(-1)
    }
    on(){
        console.log(document.documentElement.scrollTop)
    }
    open(event){
        var ev = window.event || event;

        if( event.target.innerHTML==='展开'){
            event.target.innerHTML='收起';
            event.target.parentNode.firstChild.className='';
        }else{
            event.target.innerHTML='展开';
            event.target.parentNode.firstChild.className='display';
        }
        ev.stopPropagation?ev.stopPropagation():ev.cancelBubble = true;
    }
    //短评的控制
    change(e){
        if(this.state.tag){
            document.getElementById("img").src=block;
            document.getElementById("shortComment").style.display="block";

        }else{
            document.getElementById("img").src=none;
            document.getElementById("shortComment").style.display="none"
        }
        this.setState({
            tag:!this.state.tag
        });
        var height= document.getElementsByClassName('body')[1].offsetTop;
        document.documentElement.scrollTop=height-document.getElementById('p').clientHeight
    }

    //赞同
    chose(a,b){
        x=a;
        y=b;
        $('#meng').show();
        if(arr.indexOf(x+'-'+y)>=0)
        {document.getElementById('yes').innerHTML='取消赞同';}
        else{ document.getElementById('yes').innerHTML='赞同';}
    }
    noneChose(){
        $('#meng').hide();
    }
    agreen(e){

        if(arr.indexOf(x+'-'+y)>=0){
            // e.target.innerHTML='赞同';
            $('.body').eq(x).find('.like').eq(y).html(Number($('.body').eq(x).find('.like').eq(y).html())-1);
            $('.body').eq(x).find('.imgs')[y].src=zan;
            $('#meng').hide();
            arr.splice(arr.indexOf(x+'-'+y),1)

        }else{

        $('.body').eq(x).find('.like').eq(y).html(Number($('.body').eq(x).find('.like').eq(y).html())+1);
        $('.body').eq(x).find('.imgs')[y].src=agr;
        $('#meng').hide();
            arr.push(x+'-'+y);
        }

    }

}
function time(value) {
    let date = new Date(value);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
}

export default Comment;
