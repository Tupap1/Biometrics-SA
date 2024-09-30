import React, { useState } from 'react'
import { SideBarMenuCard, SideBarMenuItem } from './Types/Types';
import { classNames } from './util/classes';
import {VscMenu} from 'react-icons/vsc';


interface SideBarMenuProps {
    items:SideBarMenuItem[];
    card:SideBarMenuCard;
  }



export default function Menu({items, card}: SideBarMenuProps) {
   const [isOpen, setIsOpen] = useState<boolean>(true);
   return <div className={classNames('SideBarMenu', isOpen ? 'expanded' : 'collapsed ')}>
    <div className='menuButton'>
      <button>
        <VscMenu />
      </button>
    </div>
   </div>
}
