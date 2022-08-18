const USER_TYPE = {
    CHILD: 'child',
    NORMAL: 'normal'
}

const SHARING_TYPE = {
    EVERYONE: 'everyone',
    ONLY_WITH: 'only_with',
    NO_ONE: 'no_one'

}

const TASK_TYPE = {
    GROUP_TASK: 'group_task',
    SCHEDULE: 'schedule_task',
    TASK_BUCKET: 'task_bucket'
}

const QUERY_FILTER = {
    ALL: 'all',
    SHARED_WITH_ME: 'shared_with_me',
    ONLY_VIEW: 'only_view',
    ONLY_EDIT: 'only_edit',
    OWNED_BY_ME: 'owned_by_me'

}


module.exports = {
    USER_TYPE,
    SHARING_TYPE,
    TASK_TYPE,
    QUERY_FILTER
}