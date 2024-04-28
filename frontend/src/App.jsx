import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function App() {
	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant='outline'>Edit Product</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Edit Product</DialogTitle>
						<DialogDescription>Make changes to your product here. Click save when you're done.</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label
								htmlFor='name'
								className='text-right'
							>
								Name
							</Label>
							<Input
								id='name'
								placeholder='name'
								className='col-span-3'
							/>
						</div>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label
								htmlFor='username'
								className='text-right'
							>
								Username
							</Label>
							<Input
								id='username'
								placeholder='price'
								className='col-span-3'
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type='submit'>Save changes</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default App;
