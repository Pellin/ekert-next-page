import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import AdminContent from '../../components/admin/AdminContent'
import AdminContextProvider from '../../contexts/admin/AdminContext'

const AdminPage: NextPage = () => {
  return <AdminContent />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  } else {
    return {
      props: {
        session,
      },
    }
  }
}

export default AdminPage
