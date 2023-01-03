import query from './query'

export type AppScreen =
  | 'HOME'
  | 'REPORTS'
  | 'CONSUMPTION'
  | 'COMPARISON'
  | 'DISAGGREGATION'
  | 'HOME_PROFILE'
  | 'CUSTOMER_PROFILE'
  | 'METER_READING'
  | 'NOTIFICATIONS'
  | 'INVOICE'

type PushNotificationResponse = {
  successful: boolean
}

/* istanbul ignore next */
const sendPushNotification = async (
  title: string,
  message: string,
  screenToOpen: AppScreen = 'HOME'
) => {
  const result = (await query(
    `mutation sendPushNotification ($input: PushNotificationInput!) {
      sendPushNotification (input: $input) {
        successful
      }
    }`,
    {
      input: { title, message, screenToOpen }
    }
  )) as PushNotificationResponse
  return result.successful
}

export default sendPushNotification
