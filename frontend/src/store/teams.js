// Action type constants
const ADD_TEAMS = 'teams/ADD_TEAMS';
const ADD_CURRENT_TEAM = 'teams/ADD_CURRENT_TEAM';
const ADD_USER_TEAMS = 'teams/ADD_USER_TEAMS'


// Action creators
const addAllTeams = (teams) => ({
    type: ADD_TEAMS,
    payload: teams
});

const addCurrentTeam = (team) => ({
    type: ADD_CURRENT_TEAM,
    payload: team
});
const addUserTeams = (teams) => ({
    type: ADD_USER_TEAMS,
    payload: teams
});

// Thunk action creators
// Get all teams thunk
export const getAllTeamsThunk = () => async (dispatch) => {
    const response = await fetch('/api/teams');
    if (response.ok) {
        const teams = await response.json();
        dispatch(addAllTeams(teams));
    }
};

// Create a new team thunk
export const createNewTeamThunk = (team) => async (dispatch) => {
    const { name, imageUrl } = team;
    const response = await fetch('/api/teams/new', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, imageUrl })
    });

    if (response.ok) {
        const team = await response.json();
        dispatch(addCurrentTeam(team));
        return null;
    } else {
        const errorResponse = await response.json();
        return errorResponse.errors;
    }
};

// Get current team by ID thunk
export const getCurrentTeamThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/teams/${id}`);
    if (response.ok) {
        const team = await response.json();
        dispatch(addCurrentTeam(team));
        return null;
    } else {
        const errorResponse = await response.json();
        return errorResponse.errors;
    }
};


// Get teams that users belong to by user id
export const getUserTeamsThunk = (id) => async (dispatch) => {
    console.log(`🖥 ~ file: teams.js:69 ~ getUserTeamsThunk ~ id:`, id)
    const response = await fetch(`/api/users/${id}/teams`);
    if (response.ok) {
        const teams = await response.json();
        dispatch(addUserTeams(teams.userTeams));
        return null;
    } else {
        const errorResponse = await response.json();
        return errorResponse.errors;
    }
};

// Update a team thunk
export const updateTeamThunk = (team) => async (dispatch) => {
    const { id, name, imageUrl } = team;
    const response = await fetch(`/api/teams/${id}/update`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, imageUrl })
    });

    if (response.ok) {
        const team = await response.json();
        dispatch(addCurrentTeam(team));
        return null;
    } else {
        const errorResponse = await response.json();
        return errorResponse.errors;
    }
};

// Delete a team thunk
export const deleteTeamThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/teams/${id}/delete`, {
        method: 'DELETE'
    });


    if (response.ok) {
        const team = await response.json();
        dispatch(addCurrentTeam(team));
        return null;
    } else {
        const errorResponse = await response.json();
        return errorResponse.errors;
    }
};

// Teams reducer
const initialState = { allTeams: {}, currentTeam: null, userTeams: [] };
const teamsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TEAMS: {
            const newState = { ...state, allTeams: { ...state.allTeams } };
            action.payload.teams.forEach(team => {
                newState.allTeams[team.id] = team
            });
            return newState;
        }
        case ADD_USER_TEAMS: {
            const newState = { ...state, userTeams: [] };
            action.payload.forEach(team => {
                newState.userTeams[team.id] = team
            });
            return newState;
        }
        case ADD_CURRENT_TEAM: {
            const newState = { ...state, currentTeam: { ...state.currentTeam } };
            newState.currentTeam = action.payload.team;
            return newState;
        }
        default:
            return state;
    }
}


export default teamsReducer;
