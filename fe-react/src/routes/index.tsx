/* eslint-disable indent */
import React, { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react'
import { history } from '@/hooks/useHistory'
import { ScrollToTop } from '@/common/components/ScrollToTop'
import { Route, Router, Routes } from 'react-router-dom'
import ValidateLogin from './ValidateLogin'
import { Loader } from '@/common/components/Loader'
import { TitlePage } from '@/common/components/TitlePage'
import RequireAuth from './RequireAuth'
import DefaultLayout from '@/layouts/DefaultLayout'
import MainLayout from '@/layouts/MainLayout'
import { generateId } from '@/utils/utils'
import useAuth from '@/hooks/useAuth'

type RouteType = {
  index?: boolean
  path?: string
  title?: string
  element: React.LazyExoticComponent<React.ComponentType<unknown>>
  children?: RouteType[]
}

const APP_NAME = process.env.APP_NAME || 'CROWFUNDING'
const titlePage = (title: string) => `${APP_NAME} - ${title}`
const lazyLoadRoute = (pageName: string) =>
  lazy(() => {
    return import(`../pages/${pageName}`)
  })

const publicRoutes: RouteType[] = [
  {
    path: '/403',
    title: titlePage('Forbidden'),
    element: lazyLoadRoute('Forbidden')
  }
]

const privateRoutes: RouteType[] = [
  {
    path: '/',
    element: lazyLoadRoute('Base'),
    children: [
      {
        index: true,
        title: titlePage(''),
        element: lazyLoadRoute('Dashboard')
      }
    ]
  },
  {
    path: '/campaigns',
    element: lazyLoadRoute('Base'),
    children: [
      {
        index: true,
        title: titlePage(''),
        element: lazyLoadRoute('Campaign')
      },
      {
        path: 'new',
        title: titlePage('Create new campaign'),
        element: lazyLoadRoute('Campaign/CreateCampaign')
      },
      {
        path: ':address/requests',
        title: titlePage('Campaign request'),
        element: lazyLoadRoute('Campaign/CampaignRequest')
      },
      {
        path: ':address',
        title: titlePage('Campaign detail'),
        element: lazyLoadRoute('Campaign/CampaignDetail')
      }
    ]
  }
]

const adminPrivateRoutes: RouteType[] = [
  {
    path: '/',
    element: lazyLoadRoute('Base'),
    children: [
      {
        index: true,
        title: titlePage(''),
        element: lazyLoadRoute('Dashboard')
      }
    ]
  },
  {
    path: '/campaigns',
    element: lazyLoadRoute('Base'),
    children: [
      {
        index: true,
        title: titlePage(''),
        element: lazyLoadRoute('Campaign')
      },
      {
        path: ':address',
        title: titlePage('Campaign detail'),
        element: lazyLoadRoute('Campaign/CampaignDetail')
      }
    ]
  }
]

const NotFoundPage = lazyLoadRoute('NotFound')

const RoutesApp = () => {
  const { isAdmin, isPrivate } = useAuth()

  const [routes, setRoutes] = useState<RouteType[]>([])
  // history state
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  })

  useLayoutEffect(() => history.listen(setState), [])

  useEffect(() => {
    const routeList = !isPrivate
      ? adminPrivateRoutes.concat(privateRoutes)
      : isAdmin
      ? adminPrivateRoutes
      : privateRoutes
    setRoutes(routeList)
  }, [isPrivate, isAdmin])

  const renderRoutes = (routes: RouteType[]) =>
    routes.map(({ element: Element, ...pageOptions }) => {
      const routeOptions = pageOptions.index ? { index: true } : { path: pageOptions.path }

      return (
        <Route
          key={generateId()}
          path={pageOptions.path}
          element={
            <Suspense fallback={<Loader mode='reverse-color' />}>
              <TitlePage title={pageOptions.title}>
                <Element />
              </TitlePage>
            </Suspense>
          }
          {...routeOptions}
        >
          {pageOptions?.children?.map(({ element: ChildrenElement, ...childrenOption }) =>
            childrenOption.index ? (
              <Route
                key={generateId()}
                index
                element={
                  <Suspense fallback={<Loader mode='reverse-color' />}>
                    <TitlePage title={childrenOption.title}>
                      <ChildrenElement />
                    </TitlePage>
                  </Suspense>
                }
              />
            ) : (
              <Route
                key={generateId()}
                path={childrenOption.path}
                element={
                  <Suspense fallback={<Loader mode='reverse-color' />}>
                    <TitlePage title={childrenOption.title}>
                      <ChildrenElement />
                    </TitlePage>
                  </Suspense>
                }
              >
                {childrenOption?.children && renderRoutes(childrenOption.children)}
              </Route>
            )
          )}
        </Route>
      )
    })

  return (
    <Router location={state.location} navigationType={state.action} navigator={history}>
      <ScrollToTop>
        <>
          <Routes>
            <Route
              element={
                <ValidateLogin>
                  <DefaultLayout />
                </ValidateLogin>
              }
            >
              {renderRoutes(publicRoutes)}
            </Route>

            <Route
              element={
                <RequireAuth>
                  <MainLayout />
                </RequireAuth>
              }
            >
              {renderRoutes(routes)}
            </Route>

            <Route
              path='*'
              element={
                <Suspense fallback={<Loader />}>
                  <TitlePage title={titlePage('Page Not Found')}>
                    <NotFoundPage />
                  </TitlePage>
                </Suspense>
              }
            />
          </Routes>
        </>
      </ScrollToTop>
    </Router>
  )
}

export default RoutesApp
