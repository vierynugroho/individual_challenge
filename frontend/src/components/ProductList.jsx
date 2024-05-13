import { useEffect, useState } from 'react';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';
import Profile from './Profile';

// import useSWR, { useSWRConfig } from 'swr';

const ProductList = () => {
	//! old
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchProduct = async () => {
		const response = await axios.get('https://individual-challenge-backend-go63voh20-viery-nugrohos-projects.vercel.app/api/v1/products', {
			withCredentials: false,
			
		});

		if (response.data.totalItems > 0) {
			setData(response.data.data);
		} else {
			setData([]);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchProduct();
	}, [data]);

	//! fix bug
	// const { mutate } = useSWRConfig();

	// const fetchProduct = async () => {
	// 	const response = await axios.get('http://localhost:2000/api/v1/products');

	// 	return { data: response.data.data, totalItems: response.data.totalItems };
	// };

	// const { data, error, isLoading } = useSWR('products', fetchProduct);

	return (
		<div className='container flex flex-col mt-5'>
			<div className='w-full'>
				<div className='flex'>
					<AddProduct />
					<Profile />
				</div>
				<div className='relative mt-5 rounded-lg shadow'>
					<table className='w-full text-sm text-left text-white'>
						<thead className='text-xs text-white uppercase bg-black'>
							<tr>
								<th className='px-1 py-3 text-center'>No</th>
								<th className='px-6 py-3 text-center'>Name</th>
								<th className='px-6 py-3 text-center'>Price</th>
								<th className='px-1 py-3 text-center'>Action</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr className='border-b'>
									<td className='px-1 py-3 text-center text-black'>
										<Skeleton className='h-6 bg-slate-300' />
									</td>
									<td className='px-1 py-3 text-center text-black'>
										<Skeleton className='h-6 bg-slate-300' />
									</td>
									<td className='px-1 py-3 text-center text-black'>
										<Skeleton className='h-6 bg-slate-300' />
									</td>
									<td className='px-1 py-3 text-center text-black'>
										<Skeleton className='h-6 bg-slate-300' />
									</td>
								</tr>
							) : data.length <= 0 ? (
								<tr>
									<td
										className='px-6 py-3 font-bold text-center text-white bg-red-700'
										colSpan='4'>
										Empty Product
									</td>
								</tr>
							) : (
								data.map((product, index) => (
									<tr
										className='border-b'
										key={product.id}>
										<td className='px-1 py-3 text-center text-black'>{index + 1}</td>
										<td className='px-6 py-3 font-bold text-black'>{product.name}</td>
										<td className='px-6 py-3 text-black'>{product.price}</td>
										<td className='px-1 py-3 text-center'>
											<EditProduct
												productId={product.id}
												productName={product.name}
											/>
											<DeleteProduct
												productId={product.id}
												productName={product.name}
											/>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ProductList;
