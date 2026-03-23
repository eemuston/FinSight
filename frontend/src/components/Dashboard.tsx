import { useUser } from '../contexts/UserContext'
import { useEffect, useState } from 'react'
import reportService from '../services/reports'

const Dashboard = () => {
    const { user } = useUser()
    const [reports, setReports] = useState<any[]>([])
    

    useEffect(() => {
        if (user) {
           reportService.getReports(user.token)
                .then(data => setReports(data))
        }
    },[user?.token])
    return (
        <div>
            {reports.length > 0 && reports[0].companyName}
        </div>
    )
}

export default Dashboard