// import theme style scss file
import 'styles/theme.scss';
import { UserProvider } from 'src/context/userContext';
export const metadata = {
    title: 'Spark RBAC',
    description: 'Kaustubh',
    keywords: 'Sparkathon, Kaustubh Inventory Management'
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className='bg-light'>
            <UserProvider>
                {children}
                </UserProvider>
            </body>
        </html>
    )
}
