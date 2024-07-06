'use client'

import clsx from "clsx";
import Link from "next/link";
interface MobileItemProps {
    
    icon: any,
    href: string,
    onClick?: () => void
    active?: boolean
}
const MobileItem:React.FC<MobileItemProps> = ({onClick,icon:Icon,href,active}) => {

    const handleClick = ()  =>{
        if(onClick){
            return onClick()
        }
    };
    return ( 
         <Link 
         onClick={handleClick}
         className={clsx(`
            group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100
            `,active && 'bg-gray-100 text-black')}
         href={href}>
            <Icon />
         </Link>
        
        );
}
 
export default MobileItem;