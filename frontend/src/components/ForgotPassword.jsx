import './Model.css';


export default function ForgotPasswordModal({close}){


function resetPassword(){

alert(
"Password reset link has been sent."
);

close();

}



return(

<div className="overlay">


<div className="modal">


<h2>
Forgot Password
</h2>


<p>
Enter your registered email
</p>


<input
placeholder="Email"
/>


<button
onClick={resetPassword}
>
Send Reset Link
</button>


<button
className="cancel"
onClick={close}
>
Cancel
</button>


</div>


</div>


);


}