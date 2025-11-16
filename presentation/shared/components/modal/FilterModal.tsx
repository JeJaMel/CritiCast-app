import { useState } from 'react';
import { View, Pressable, Modal, ScrollView } from 'react-native';
import * as Haptics from 'expo-haptics';
import ModalHeader from './ModalHeader';
import SortBySection from './SortBySection';
import CategoriesSection from './CategoriesSection';
import ActionButtons from './ActionButtons';
import RatingsSection from './RatingSection';
import { MovieFilters } from '@/core/movies/interfaces/filters.interface';

// props interface for the modal
interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: MovieFilters) => void;
}

const FilterModal = ({ visible, onClose, onApply }: FilterModalProps) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedRating, setSelectedRating] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState('rating');

    const categories = [
        'Action', 'Adventure', 'Animation', 'Comedy', 'Science Fiction',
        'Crime', 'Documentary', 'Drama', 'Fantasy', 'Horror', 'Mystery',
        'Romance', 'Thriller', 'War', 'Western'
    ];

    const ratings = ['8+', '7+', '6+', '5+'];

    const toggleCategory = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleClearAll = () => {
        Haptics.selectionAsync();
        setSelectedCategories([]);
        setSelectedRating(null);
        setSortBy('rating');
    };

    const handleApplyFilters = () => {
        Haptics.selectionAsync();
        const filters: MovieFilters = {
            sortBy: sortBy as MovieFilters['sortBy'],
        };

        if (selectedRating) {
            filters.tmdbRatingFrom = parseInt(selectedRating, 10);
        }

        if (selectedCategories.length > 0) {
            filters.genres = selectedCategories
                .map(genre => encodeURIComponent(genre))
                .join(',');
        }

        onApply(filters);
        onClose();
    };

    const handleClose = () => {
        Haptics.selectionAsync();
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' }}>
                <Pressable style={{ flex: 1 }} onPress={onClose} />

                <View style={{ backgroundColor: '#1a1d29', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingTop: 24, paddingBottom: 40, maxHeight: '80%' }}>
                    <ModalHeader onClose={handleClose} />
                    <ScrollView style={{ paddingHorizontal: 24 }}>
                        <SortBySection sortBy={sortBy} setSortBy={setSortBy} />
                        <RatingsSection ratings={ratings} selectedRating={selectedRating} setSelectedRating={setSelectedRating} />
                        <CategoriesSection categories={categories} selectedCategories={selectedCategories} toggleCategory={toggleCategory} />
                        <ActionButtons onClear={handleClearAll} onApply={handleApplyFilters} />
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}
export default FilterModal;