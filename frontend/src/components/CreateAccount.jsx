import './Model.css';

export default function CreateAccountModal({close}){


function createAccount(){

alert(
"Account created successfully.\nPlease wait for administrator approval."
);

close();

}


return(

<div className="overlay">


<div className="modal">


<h2>
Create Account
</h2>


<input
placeholder="Email"
/>


<input
placeholder="Username"
/>


<input
type="password"
placeholder="Password"
/>


<input
type="password"
placeholder="Confirm Password"
/>


<button
onClick={createAccount}
>
Create
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