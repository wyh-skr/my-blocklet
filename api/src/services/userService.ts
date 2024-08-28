import supabase from '../libs/db';
import { User } from '../libs/types';

export class UserService {
  async getUserInfo(id: number) {
    const { data, error } = await supabase.from('user').select('*').eq('id', id).single();
    if (error) {
      throw error;
    }
    return data;
  }

  async updateUserInfo(id: number, data: Omit<User, 'id'>) {
    const { error } = await supabase.from('user').update(data).eq('id', id);
    if (error) {
      throw error;
    }
    return true;
  }
}

const userService = new UserService();
//单例
export default userService;
