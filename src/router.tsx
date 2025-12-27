import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import { lazy, Suspense } from 'react';
import AuthLayout from './layouts/Auth/AuthLayout';


const CronPage = lazy(() => import('./views/CronPage/CronPage'));
const RoutinePage = lazy(() => import('./views/Routine/RoutinePage/RoutinePage'));
const CreateRoutinePage = lazy(() => import('./views/Routine/CreateRoutinePage/CreateRoutinePage'));
const RoutineDetailPage = lazy(() => import('./views/Routine/RoutineDetailPage/RoutineDetailPage'));

const ExercisesPage = lazy(() => import('./views/Exercise/ExercisesPage/ExercisesPage'));
const CreateExercisePage = lazy(() => import('./views/Exercise/CreateExercisePage/CreateExercisePage'));

const LoginPage = lazy(() => import('./views/Auth/LoginPage/LoginPage'));


export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes >
                {/* //comparte el diseño de esta ruta */}
                <Route path='/' element={<Layout />}>
                    <Route index element={<Navigate to="/auth" replace />} />
                    <Route
                        path='/cron'
                        element={
                            <Suspense fallback="Cargando..." >
                                <CronPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path='/rutinas'
                        element={
                            <Suspense fallback="Cargando..">
                                <RoutinePage />
                            </Suspense>
                        }
                    />
                    <Route
                        path='/rutinas/crear'
                        element={
                            <Suspense fallback="Cargando..">
                                <CreateRoutinePage />
                            </Suspense>
                        }
                    />
                    <Route
                        path='/rutina/:id'
                        element={
                            <Suspense fallback="Cargando..">
                                <RoutineDetailPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path='/ejercicios'
                        element={
                            <Suspense fallback="Cargando..">
                                <ExercisesPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path='/ejercicios/crear'
                        element={
                            <Suspense fallback="Cargando..">
                                <CreateExercisePage />
                            </Suspense>
                        }
                    />

                </Route>

                <Route path="/auth" element={<AuthLayout></AuthLayout>} >
                    <Route index element={<Navigate to="/auth/login" replace />} />
                    <Route
                        path='login'
                        element={
                            <Suspense>
                                <LoginPage />
                            </Suspense>
                        }
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    )
}
