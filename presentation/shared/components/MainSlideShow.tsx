import { useRef, useEffect, useState } from 'react'
import { View, useWindowDimensions } from 'react-native'
import PagerView from 'react-native-pager-view'
import MovieSlide from '../../Movies/components/MovieSlide'
import { Movie } from '@/sync-movies/src/interfaces/movie.interface';

interface Props {
    movies: Movie[];
}

const MainSlideShow = ({ movies }: Props) => {
    const width = useWindowDimensions().width
    const pagerRef = useRef<PagerView>(null)
    const [page, setPage] = useState(0)

    useEffect(() => {
        if (movies.length === 0) return
        const interval = setInterval(() => {
            const nextPage = (page + 1) % movies.length
            pagerRef.current?.setPage(nextPage)
            setPage(nextPage)
        }, 5000)
        return () => clearInterval(interval)
    }, [page, movies.length])

    return (
        <View>
            <PagerView
                ref={pagerRef}
                style={{ width: width, height: 250 }}
                initialPage={0}
                onPageSelected={e => setPage(e.nativeEvent.position)}
                
            >
                {movies.map((movie) => (
                    <MovieSlide key={movie.id} movie={movie} />
                ))}
            </PagerView>
        </View>
    )
}



export default MainSlideShow;