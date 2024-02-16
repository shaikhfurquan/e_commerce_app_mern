
import JWT from 'jsonwebtoken'

export const generateToken = async (user) => {
    try {
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        return token

    } catch (error) {
        console.log('Error signing token', error.message);
    }
}
