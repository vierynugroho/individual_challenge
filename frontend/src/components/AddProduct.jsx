import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const AddProduct = () => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');

	const saveProduct = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				'https://individual-challenge-xek4.vercel.app/api/v1/products',
				{
					name: name,
					price: Number(price),
				},
				{
					withCredentials: false,
				}
			);

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
			setName('');
			setPrice(0);
		} catch (error) {
			toast.error(error.response.data.message, {
				style: {
					backgroundColor: 'red',
					color: 'white',
				},
				iconTheme: {
					primary: 'white',
					secondary: 'red',
				},
			});
		}
	};

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button
						variant='outline'
						className='px-4 py-2 font-bold text-white bg-black border rounded-lg hover:bg-slate-900 hover:text-white border-slate-50'>
						<i className='fa-solid fa-plus'></i> &nbsp; Add Product
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Add Product</DialogTitle>
						<DialogDescription>Create your product here. Click save when you're done.</DialogDescription>
					</DialogHeader>
					<form
						className='my-5'
						onSubmit={saveProduct}>
						<div className='flex flex-col'>
							<div>
								<label className='font-bold text-white'>Product Name</label>
								<input
									value={name}
									onChange={(e) => setName(e.target.value)}
									type='text'
									className='w-full px-3 py-3 mt-1 border rounded-lg shadow border-slate-600 focus:outline-none focus:border-slate-500 hover:'
									placeholder='Product Name'
								/>
							</div>
							<div className='mb-10'>
								<label className='font-bold text-white'>Price</label>
								<input
									value={price}
									onChange={(e) => setPrice(e.target.value)}
									type='number'
									className='w-full px-3 py-3 mt-1 border rounded-lg shadow border-slate-600 focus:outline-none focus:border-slate-500 hover:'
									placeholder='Product Price'
								/>
							</div>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<button
									type='submit'
									className='w-full py-3 font-bold text-white bg-black rounded-lg hover:bg-slate-900 border-slate-500 hover:shadow'>
									<i className='fa-solid fa-floppy-disk'></i> &nbsp; Save
								</button>
							</DialogClose>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default AddProduct;
