import React from 'react'
import { Icon, Table } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { IDispatchable } from '../../models'

import './styles.scss'

interface IMyBlogTableProps extends IDispatchable {
  readonly dataSource: any
  readonly pagination: any
}

const MyBlogTable: React.FC<IMyBlogTableProps> = ({
  dataSource,
  pagination,
}) => {
  return (
    <div className="my-blog-table-wrapper">
      <Table dataSource={dataSource} pagination={pagination}>
        <Table.Column
          title="작성자"
          dataIndex="nickname"
          key="nickname"
          width={150}
        />
        <Table.Column title="제목" dataIndex="title" key="title" width={500} />
        <Table.Column
          title="작성일"
          dataIndex="createdAt"
          key="createdAt"
          width={150}
        />
        <Table.Column
          title="수정"
          dataIndex="id"
          key="id"
          width={100}
          render={(record: string) => (
            <Link to={`/update-blog/${record}`}>
              <Icon className="blog-update-btn" type="edit" />
            </Link>
          )}
        />
      </Table>
    </div>
  )
}

const withConnect = connect()

export default compose<IMyBlogTableProps, IMyBlogTableProps>(withConnect)(
  MyBlogTable
)
