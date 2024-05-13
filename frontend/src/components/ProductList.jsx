import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';
import Profile from './Profile';

import useSWR, { useSWRConfig } from 'swr';

const ProductList = () => {
	//! old
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchProduct = async () => {
		const response = await axios.get('http://localhost:2000/api/v1/products');

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
		<div className='flex flex-col mt-5 container'>
			<div className='w-full'>
				<div className='flex'>
					<AddProduct />
					<Profile />
				</div>
				<div className='relative shadow rounded-lg mt-5'>
					<table className='w-full text-sm text-left text-white'>
						<thead className='text-xs text-white uppercase bg-black'>
							<tr>
								<th className='py-3 px-1 text-center'>No</th>
								<th className='py-3 px-6 text-center'>Name</th>
								<th className='py-3 px-6 text-center'>Price</th>
								<th className='py-3 px-1 text-center'>Action</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr className='border-b'>
									<td className='py-3 px-1 text-black text-center'>
										<Skeleton className='h-6 bg-slate-300' />
									</td>
									<td className='py-3 px-1 text-black text-center'>
										<Skeleton className='h-6 bg-slate-300' />
									</td>
									<td className='py-3 px-1 text-black text-center'>
										<Skeleton className='h-6 bg-slate-300' />
									</td>
								</tr>
							) : data.length <= 0 ? (
								<tr>
									<td
										className='py-3 px-6 text-center bg-red-700 text-white font-bold'
										colSpan='4'
									>
										Empty Product
									</td>
								</tr>
							) : (
								data.map((product, index) => (
									<tr
										className='border-b'
										key={product.id}
									>
										<td className='py-3 px-1 text-black text-center'>{index + 1}</td>
										<td className='py-3 px-6 text-black font-bold'>{product.name}</td>
										<td className='py-3 px-6 text-black'>{product.price}</td>
										<td className='py-3 px-1 text-center'>
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
