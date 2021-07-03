import React, {useContext} from 'react';
import {FinishOrder} from './FinishOrder';
import {toCurrency} from '../hooks/toCurrency.hook';
import {AuthContext} from '../context/authContext';
import {useHttp} from '../hooks/http.hook';
import { useState } from 'react';
import {Button} from 'react-materialize';

export const ItemsCartComponent = ({cartItems}) => {
	const [isFinished, setIsFinished] = useState(false);
	// console.log(changeFinish());

	const auth = useContext(AuthContext);
	const {request} = useHttp();
	
	const changeCount = async (itemId, currentCount) => {
		await request('/api/user/updateCount', 'POST', {itemId, currentCount}, {Autharization: `Bearer ${auth.token}`})
	}

	const changeFinish = () => {
		setIsFinished(!isFinished);
	}

	const trigger = <Button className="btn btn-primary" onClick={changeFinish}>Finish the order and pay</Button>

	let totalPrice = 0;
	return (
		<div className="row">
			{/* {isFinished && <FinishOrder onClick={changeFinish} totalItems={cartItems}/>} */}
			{
				!cartItems.length ? <p>The cart is empty!</p> :

				<table className="striped">
					<thead>
						<tr>
							<th>Item Name</th>
							<th>Item Count</th>
							<th>Total Price</th>
						</tr>
						</thead>
		
						<tbody>
							{cartItems.map(cartItem => {
								totalPrice += (cartItem.price * cartItem.count);
								
								return (
									<tr key={cartItem._id}>
										<th>{cartItem.title}</th>
										<th>
											<button className="btn grey countBtn" onClick={() => changeCount(cartItem.itemId, ++cartItem.count)} disabled={cartItem.count <= 0}>+</button>

											{cartItem.count}

											<button className="btn grey countBtn" onClick={() => changeCount(cartItem.itemId, --cartItem.count)} disabled={cartItem.count <= 0}>-</button>
										</th>
										<th>{toCurrency(cartItem.count * cartItem.price)}</th>
									</tr>
								)
							})}

							<tr>
								<th>
									{<FinishOrder totalItems={cartItems} trigger={trigger}/>}
								</th>
								<th className="totalPrice" colSpan="2">
									<b>Total: </b>

									{toCurrency(totalPrice)}
								</th>
							</tr>
					</tbody>
				</table>
			}
		</div>
	)
}