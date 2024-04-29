import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import axios from 'axios';
import toast from 'react-hot-toast';

const DeleteProduct = ({ productId, productName }) => {
	const deleteProduct = async (productId) => {
		const response = await axios.delete(`http://localhost:2000/api/v1/products/${productId}`);
		toast.success(response.data.message, {
			style: {
				backgroundColor: 'green',
				color: 'white',
			},
			iconTheme: {
				primary: 'white',
				secondary: 'green',
			},
		});
	};

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button
						variant='outline'
						className='bg-red-600 hover:bg-red-700 hover:text-white border border-slate-50 text-white font-bold py-2 px-4 rounded-lg'
					>
						<i class='fa-solid fa-trash'></i> &nbsp; Delete Product
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Delete Product</DialogTitle>
					</DialogHeader>
					<DialogDescription>
						Are you sure delete <span className='font-bold size-2 text-red-700'>{productName}</span> ?
					</DialogDescription>
					<DialogFooter>
						<Button
							onClick={() => deleteProduct(productId)}
							className='bg-red-700'
						>
							<i class='fa-solid fa-check'></i> &nbsp; Delete
						</Button>
						<DialogClose>
							<Button>
								<i class='fa-solid fa-xmark'></i> &nbsp; Cancel
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default DeleteProduct;
