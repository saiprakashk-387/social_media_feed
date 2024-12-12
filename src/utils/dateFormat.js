import moment from 'moment'

export const dateFormat = (dateUnix) => {
    const date = moment(dateUnix).fromNow()
    return date;
}