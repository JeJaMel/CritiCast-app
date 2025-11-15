import React, { useState } from 'react';
import { View, Pressable, Modal, ScrollView } from 'react-native';
import * as Haptics from 'expo-haptics';
import ModalHeader from './ModalHeader';
import SortBySection from './SortBySection';
import CategoriesSection from './CategoriesSection';
import ActionButtons from './ActionButtons';
import RatingsSection from './RatingSection';

// Define the props interface for the modal
interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
}

const FilterModal = ({ visible, onClose }: FilterModalProps) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedRating, setSelectedRating] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState('rating');

    const categories = [
        'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
        'Documentary', 'Drama', 'Fantasy', 'Horror', 'Mystery',
        'Romance', 'Sci-Fi', 'Thriller', 'War', 'Western'
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
        // TODO: ADD real logic 
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