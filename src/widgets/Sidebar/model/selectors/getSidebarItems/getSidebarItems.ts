import { createSelector } from '@reduxjs/toolkit'
import { getAuthData } from '@/entities/User'
import { SidebarItemType } from '../../types/sidebar'
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from '@/shared/const/router'
import MainIconDeprecated from '@/shared/assets/icons/main-20-20.svg'
import AboutIconDeprecated from '@/shared/assets/icons/about-20-20.svg'
import ProfileIconDeprecated from '@/shared/assets/icons/profile-20-20.svg'
import ArticleIconDeprecated from '@/shared/assets/icons/article-20-20.svg'
import { toggleFeatures } from '@/shared/lib/features'

import MainIcon from '@/shared/assets/icons/home.svg'
import ArticleIcon from '@/shared/assets/icons/article.svg'
import AboutIcon from '@/shared/assets/icons/Info.svg'
import ProfileIcon from '@/shared/assets/icons/avatar.svg'

export const getSidebarItems = createSelector(getAuthData, (userData) => {
  const sidebarItemList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        on: () => MainIcon,
        off: () => MainIconDeprecated
      }),
      text: 'Главная'
    },
    {
      path: getRouteAbout(),
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        on: () => AboutIcon,
        off: () => AboutIconDeprecated
      }),
      text: 'О сайте'
    }
  ]

  if (userData) {
    sidebarItemList.push(
      {
        path: getRouteProfile(userData.id),
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          on: () => ProfileIcon,
          off: () => ProfileIconDeprecated
        }),
        text: 'Профиль',
        authOnly: true
      },
      {
        path: getRouteArticles(),
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          on: () => ArticleIcon,
          off: () => ArticleIconDeprecated
        }),
        text: 'Статьи',
        authOnly: true
      }
    )
  }

  return sidebarItemList
})
