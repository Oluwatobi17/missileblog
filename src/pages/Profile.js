import ProfileImg from '../components/ProfileImg';
import EditProfileForm from '../components/EditProfileForm';

const Profile = () =>{
    return <section className='title'>
        <h1>Update Your Account</h1>
        <ProfileImg />

        <EditProfileForm />
    </section>
}


export default Profile;