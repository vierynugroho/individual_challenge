import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile = () => {
	return (
		<>
			<div className='profile flex justify-end w-full'>
				<div className='profile__name mx-2 flex flex-col text-right leading-tight'>
					<p className='font-bold'>Viery Nugroho</p>
					<p className='font-thin'>FSW 1 Jago</p>
				</div>
				<Avatar>
					<AvatarImage src='https://avatars.githubusercontent.com/u/61929120?v=4' />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</div>
		</>
	);
};

export default Profile;
