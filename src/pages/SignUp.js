import React , {Component} from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import '../CSS/SignUp.css';
import ReactTooltip from 'react-tooltip'
import Modal from 'react-modal'
import bronze from '../img/icon/bronze.png'
import silver from '../img/icon/silver.png'
import gold from '../img/icon/gold.png'
import platinum from '../img/icon/platinum.png'
import diamond from '../img/icon/diamond.png'
import visa from '../img/icon/visa.png'
import master from '../img/icon/mastercard.png'
import swal from 'sweetalert'
import Footer from '../components/Footer'

class SignUp extends Component {
    
    constructor(props){
        super(props);
        this.state = { username: '', password: '', cfpassword: '', firstname: '', lastname: '', 
        gender: 'male',email: '', birthday:'', tel: '',  address: '', classes: '', isActive: false,
        cardNumber: '', ccv:'', cardHolder:'', exp:'', customer:'', cardDetail:[]};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }


    handleChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleAdd() {
        const newCard = this.state.cardDetail;
        newCard.push({owner: this.state.cardHolder, credit_no: this.state.cardNumber, ccv: this.state.ccv, expire_date: this.state.exp});
        this.setState({cardDetail: newCard, isActive: !this.state.isActive});
        console.log(this.state.cardDetail);

        this.setState({ owner: '', cardNumber: '', ccv: '', exp: '', cardHolder:''});
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    toggleModal = () => {
        this.setState({
            isActive: !this.state.isActive
        })
    }

    handleSubmit(event){

        axios.post('https://pairmhai-api.herokuapp.com/membership/register/', {
            "user": {
                "username": this.state.username,
                "first_name": this.state.firstname,
                "last_name": this.state.lastname,
                "email": this.state.email,
                "telephone": this.state.tel,
                "address": this.state.address,
                "date_of_birth": this.state.birthday,
                "gender": this.state.gender
            },
            "password1": this.state.password,
            "password2": this.state.cfpassword,
            "classes": this.state.classes,

            "credit_cards": this.state.cardDetail,
        })
        .then(function (response) {
            swal("Success","Please verify your e-mail", "success");
            window.location = "/home"
            console.log(response);
        })
        .catch(function (error) {
            console.log(error.response);
            swal ( "Oops" ,  "Please enter valid data" ,  "error" )
        });
         event.preventDefault();  
     }

  
    render() {
        const allCard = this.state.cardDetail.map((cardVal, index)=>{
          return <div className="row" key={index}>
                <div className="first-col">{cardVal.owner}</div>&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="second-col">{cardVal.credit_no}</div>&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="third-col">{cardVal.expire_date}</div>&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
        });

        
        return (
            <div>
                <Navbar />
            <div className="siup-center container-fluid">
                <p className="signup">SIGN UP</p>
                
                    <div className="container">
                        USERNAME: <input type="user" name="username" value={this.state.username} onChange={this.handleChange} />&nbsp;&nbsp;&nbsp;&nbsp;
                        PASSWORD: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>&nbsp;&nbsp;&nbsp;&nbsp;
                        CONFIRM PASSWORD: <input type="password" name="cfpassword" value={this.state.cfpassword} onChange={this.handleChange}/>
                    </div>
                    <p className="person">PERSONAL INFORMATION</p>
                    <div className="container">
                        FIRSTNAME: <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange}/> &nbsp;&nbsp;&nbsp;&nbsp;
                        LASTNAME: <input  type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange}/> <br></br> <br></br>
                        GENDER: 
                            &nbsp;<input type="radio" name="gender" value="male" className="gender" onChange={this.handleChange} defaultChecked /> MALE &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;<input type="radio" name="gender" className="gender" value="female" onChange={this.handleChange}/> FEMALE

                            BIRTHDAY: <input type="date" name="birthday" className="hbd" value={this.state.birthday} onChange={this.handleChange}/>
                                  <br></br><br></br>&nbsp;&nbsp;&nbsp;&nbsp;
                        E-MAIL: <input type="email" name="email" value={this.state.email} onChange={this.handleChange}/> &nbsp;&nbsp;&nbsp;&nbsp;
                        TEL: <input type="text" name="tel" value={this.state.tel} onChange={this.handleChange}/><br></br> <br></br>&nbsp;&nbsp;&nbsp;&nbsp;
                        <a className="address">ADDRESS:</a>
                        <br/><textarea className="addr" name="address" value={this.state.address} onChange={this.handleChange}/><br/><br/>
                        
                        <a className="member">MEMBERSHIP:</a>
                        <div type="container" className="radio-container">

                        <div className="member-box">
                            <img id="class-icon" src={diamond} alt="diamond-icon" className="diamond-icon member-icon" 
                            data-tip="Discount 12% each time that purchase product."/> 
                            <br/><input type="radio" name="classes" value="5" className="member-radio" defaultChecked={this.state.classes} onChange={this.handleChange}/>
                            <a>DIAMOND</a><ReactTooltip place="top" type="dark" effect="float"/>
                        </div>
                           
                        <div className="member-box">
                            <img id="class-icon" src={platinum} alt="platinum-icon" className="platinum-icon member-icon"
                            data-tip="Discount 10% each time that purchase product."/> 
                            <br/><input type="radio" name="classes" value="4" className="member-radio" onChange={this.handleChange}/>
                            <a>PLATINUM</a><ReactTooltip place="top" type="dark" effect="float"/>
                        </div>
                          
                        <div className="member-box">
                            <img id="class-icon" src={gold} alt="gold-icon" className="gold-icon member-icon"
                            data-tip="Discount 8% each time that purchase product."/> 
                            <br/><input type="radio"  name="classes" value="3" className="member-radio" onChange={this.handleChange}/>
                            <a>GOLD</a><ReactTooltip place="top" type="dark" effect="float"/>
                        </div>

                        <div className="member-box">
                            <img id="class-icon" src={silver} alt="silver-icon" className="silver-icon member-icon"
                            data-tip="Discount 5% each time that purchase product."/> 
                            <br/><input type="radio" name="classes" value="2" className="member-radio" onChange={this.handleChange}/>
                            <a>SILVER</a><ReactTooltip place="top" type="dark" effect="float"/>
                        </div>
                            
                        <div className="member-box">
                            <img id="class-icon" src={bronze} alt="bronze-icon" className="bronze-icon member-icon"
                            data-tip="Discount 2% each time that purchase product."/> 
                            <br/><input type="radio" name="classes" value="1" className="member-radio" onChange={this.handleChange}/>
                            <a>BRONZE</a><ReactTooltip place="top" type="dark" effect="float"/>
                        </div>
                                             
                        </div>
                        <br/>
                    </div>
                    <p className="payment">PAYMENT INFORMATION</p>
                    <div className="container">  
                            {allCard} 
                            <br/>               
                        <div>
                            <button className="signup_btn pull-right" onClick={this.toggleModal}>ADD CARD</button>
                            <Modal contentLabel="modal" isOpen={this.state.isActive} onRequestClose={this.toggleModal}>
                                <div>
                                    <p className="add-card-info">CARD INFORMATION</p>
                                </div><br/>
                                <div className="info-box">
                                    <div className="card-box">
                                        <input type="radio" name="card" onChange={this.handleChange} defaultChecked/>
                                        <img id="visa_icon" src={visa} alt="visa-icon"/> 
                                        <input type="radio" name="card" onChange={this.handleChange}/>
                                        <img id="visa_icon" src={master} alt="master-icon"/>    
                                    </div>
                                    <br/>
                                    Card Number &nbsp;&nbsp;<input name="cardNumber" value={this.state.cardNumber} onChange={this.handleChange}/>&nbsp;&nbsp;
                                    CCV &nbsp;&nbsp;<input  name="ccv" value={this.state.ccv} onChange={this.handleChange}/><br/><br/>            
                                    Card Holder &nbsp;&nbsp;<input  name="cardHolder" value={this.state.cardHolder} onChange={this.handleChange}/>&nbsp;&nbsp;
                                    EXP &nbsp;&nbsp;<input type="date" name="exp" value={this.state.exp} onChange={this.handleChange}/>
                                </div><br/>
                                <button className="signup_btn modal-btn" onClick={this.toggleModal}>CANCEL</button>
                                <button className="signup_btn modal-btn" onClick={this.handleAdd}>ADD</button>
                            </Modal>

                        </div>
                    </div><br></br>
                <button className="signup_btn" onClick={this.handleSubmit} >SIGN UP</button><br></br><br></br>
            </div>
                <div >
                    <Footer />
                </div>
            </div>
        );
    }
}

export default SignUp
