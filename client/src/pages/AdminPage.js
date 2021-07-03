import React from 'react';
import {Collapsible, CollapsibleItem} from 'react-materialize';
import {AddNewItems} from '../components/AddNewItems';
import { OrdersComponent } from '../components/OrderList';

export const AdminPage = () => {
  return (
    <div className="row">
      <div className="col s12">
        <h1>Admin Panel</h1>

        <Collapsible accordion>
          <CollapsibleItem expanded header="Add New Item">
            <AddNewItems />
          </CollapsibleItem>
          <CollapsibleItem header="Finish Orders">
            <OrdersComponent />
          </CollapsibleItem>
        </Collapsible>
      </div>
    </div>
  )
}