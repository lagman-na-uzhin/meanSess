import React, { Fragment, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChangePasswordRequest } from '../apiRequest/authRequest'
import { ErrorToast, IsPassword } from '../helper/formHelper'

const ChangePassword = () => {
  let oldPassRef,newPassRef = useRef()
  let navigate = useNavigate()

  const changePassword = () =>{
    let oldPass = oldPassRef.value;
    let newPass = newPassRef.value;

    if(IsPassword(newPass)){
        ErrorToast("Password must be six characters, at least one letter and one number !")
    }
    else{
      ChangePasswordRequest(oldPass,newPass).then((result)=>{
        if(result)  navigate('/')
      })
    }
  }
  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="shadow-sm animated fadeIn w-100 p-3">
              <div className="d-flex flex-column gap-3">
                <h4>Change Password</h4>
                <div className="col-md-12">
                  <input ref={(input)=>oldPassRef=input} placeholder="Old Password" className="form-control animated fadeInUp" type="password" />
                </div>
                <div className="col-md-12">
                  <input ref={(input)=>newPassRef=input} placeholder="New Password" className="form-control animated fadeInUp" type="password" />
                </div>
                  <div className="col-md-12">
                    <button onClick={changePassword} className="btn mt-3 w-100 float-end btn-success animated fadeInUp">Submit</button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ChangePassword