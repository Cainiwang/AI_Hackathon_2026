import './Model.css';


export default function ChangePasswordModal({close}){


function changePassword(){

alert(
"Password changed successfully."
);

close();

}


return(

<div className="overlay">


<div className="modal">


<h2>
Change Password
</h2>


<input
type="password"
placeholder="Old Password"
/>


<input
type="password"
placeholder="New Password"
/>


<input
type="password"
placeholder="Confirm Password"
/>


<button
onClick={changePassword}
>
Save
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