import Link from 'next/link';
import classes from "./main-layout.module.css";
 
 function MainHeader() {
     return (
         <header className={classes.header}>
             <div className={classes.logo}>
             <Link href="/">Next Events</Link>
             </div>
             <nav>
                 <ul className={classes.navigation}>
                     <li>
                         <Link href="/events">Brows all Events</Link>
                     </li>
                 </ul>
             </nav>
             
         </header>
     )
 }
export default MainHeader;