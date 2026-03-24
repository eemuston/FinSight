import { useUser } from '../contexts/UserContext'
import { useEffect, useState } from 'react'
import reportService from '../services/reports'
import type { Report } from '../types'

const Dashboard = () => {
    const { user } = useUser()
    const [reports, setReports] = useState<Report[]>([])

    useEffect(() => {
        if (!user) return

        const fetchReports = async () => {
            try{
                const data = await reportService.getReports(user.token)
                setReports(data)
            } catch (error) {
                console.error('Failed to fetch reports', error)
            }
        }
        fetchReports()
    },[user?.token])

    return (
        <div>
            {reports.length > 0 && reports[0].companyName}
        </div>
    )
}

export default Dashboard