// Generate random avatar for users
export const getRandomUserAvatar = (userId: string | number): string => {
    return `https://i.pravatar.cc/150?u=${userId}`;
};

// Generate random image for posts
export const getRandomPostImage = (postId: number): string => {
    // Use different image services for variety
    const imageServices = [
        `https://picsum.photos/seed/${postId}/400/300`,
        `https://source.unsplash.com/random/400x300?sig=${postId}`,
        `https://loremflickr.com/400/300?lock=${postId}`
    ];

    // Use post ID to consistently get the same image for the same post
    const serviceIndex = postId % imageServices.length;
    return imageServices[serviceIndex];
}; 