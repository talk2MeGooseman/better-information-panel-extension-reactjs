import { gql } from '@apollo/client'

export const BipQuery = gql`
  query getBipInfo {
    channel {
      bipConfig {
        id
        tabs {
          bgColor
          body
          textColor
          title
        }
        togglePosition
        transparent
        visibility
      }
      id
      channelId
    }
  }
`

export const CustomTeamMutation = gql`
  mutation UpsertBipConfig($tabs: [InputTab], $togglePosition: String, $transparent: Boolean, $visibility: Boolean) {
    upsertBipConfig(tabs: $tabs, togglePosition: $togglePosition, transparent: $transparent, visibility: $visibility) {
      id
      tabs {
        bgColor
        body
        textColor
        title
      }
      togglePosition
      transparent
      visibility
    }
  }
`
